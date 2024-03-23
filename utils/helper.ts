export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function formatToEuroCurrency(number: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
  return formatter.format(number);
}
export function formatCentsToEuroCurrency(number: number): string {
  const nonCents = number / 100;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
  return formatter.format(nonCents);
}

export async function getImagesWithDimensions(
  pictures: FileList
): Promise<{ picture: File; dimensions: { width: number; height: number } }[]> {
  try {
    const filesWithDimensions: {
      picture: File;
      dimensions: { width: number; height: number };
    }[] = [];

    const readNextFile = (index: number): Promise<void> => {
      if (index >= pictures.length) {
        // All files have been processed
        return Promise.resolve();
      }
      const file = pictures[index];
      const reader = new FileReader();

      return new Promise((resolve) => {
        reader.onload = function (e) {
          const img = new Image();
          if (!e.target) return;
          img.src = e.target.result as string;
          img.onload = function () {
            const width = img.width;
            const height = img.height;
            const fileWithDimensions = {
              picture: file,
              dimensions: { width, height },
            };
            filesWithDimensions.push(fileWithDimensions);
            resolve(readNextFile(index + 1));
          };
        };
        reader.readAsDataURL(file);
      });
    };

    await readNextFile(0);
    return filesWithDimensions;
  } catch (error) {
    console.error(`Problem getting images with dimensions: ${error}`);
    throw new Error(`Problem getting images with dimensions: ${error}`);
  }
}
