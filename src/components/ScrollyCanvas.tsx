// Preload images with concurrency pooling, retries, and fallback recovery
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const loadedFrames: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);

    const getFramePath = (index: number) => {
      const paddedIndex = String(index).padStart(2, "0");
      return `/sequence/frame_${paddedIndex}_delay-0.066s.webp`;
    };

    const loadSingleImage = (index: number, attempt = 0): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        if (isCancelled) return resolve(null);
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          if (isCancelled) return resolve(null);
          loadedFrames[index] = img;
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
          resolve(img);
        };
        img.onerror = () => {
          if (isCancelled) return resolve(null);
          if (attempt < 3) {
            // Retry with exponential backoff
            setTimeout(() => {
              loadSingleImage(index, attempt + 1).then(resolve);
            }, 100 * Math.pow(2, attempt));
          } else {
            // Graceful fallback: continue so loading reaches 100%
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
            resolve(null);
          }
        };
      });
    };

    const loadAllFrames = async () => {
      // Concurrency limit of 6 simultaneous downloads (matches browser socket limits)
      const concurrency = 6;
      const queue = Array.from({ length: totalFrames }, (_, i) => i);

      const worker = async () => {
        while (queue.length > 0 && !isCancelled) {
          const index = queue.shift();
          if (index !== undefined) {
            await loadSingleImage(index);
          }
        }
      };

      await Promise.all(
        Array.from({ length: Math.min(concurrency, totalFrames) }, () => worker())
      );

      if (isCancelled) return;

      // Fill in any failed frames with the adjacent valid frame
      let lastValidImg: HTMLImageElement | null = null;
      for (let i = 0; i < totalFrames; i++) {
        if (loadedFrames[i]) {
          lastValidImg = loadedFrames[i];
        } else if (lastValidImg) {
          loadedFrames[i] = lastValidImg;
        }
      }
      if (lastValidImg) {
        for (let i = totalFrames - 1; i >= 0; i--) {
          if (!loadedFrames[i]) {
            loadedFrames[i] = lastValidImg;
          } else {
            lastValidImg = loadedFrames[i];
          }
        }
      }

      const validFrames = loadedFrames.filter(Boolean) as HTMLImageElement[];
      if (validFrames.length > 0) {
        setImages(validFrames);
        setIsLaunchingReady(true);
      }
    };

    loadAllFrames();

    return () => {
      isCancelled = true;
    };
  }, []);
