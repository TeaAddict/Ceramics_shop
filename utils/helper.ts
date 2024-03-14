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

export async function getImagesFilesWithDimensions(
  pictures: FileList
): Promise<File[]> {
  const filesWithDimensions: File[] = [];

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

          // Create a new File object with added width and height properties
          const fileWithDimensions = new File([file], file.name, {
            type: file.type,
            lastModified: file.lastModified,
          }) as File & { width: number; height: number };

          fileWithDimensions.width = width;
          fileWithDimensions.height = height;

          // Add the file to the result array
          filesWithDimensions.push(fileWithDimensions);

          // Continue to the next file
          resolve(readNextFile(index + 1));
        };
      };

      reader.readAsDataURL(file);
    });
  };

  await readNextFile(0);
  return filesWithDimensions;
}

export async function getImagesWithDimensions(
  pictures: FileList
): Promise<{ picture: File; dimensions: { width: number; height: number } }[]> {
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

          // Create an object with picture and dimensions properties
          const fileWithDimensions = {
            picture: file,
            dimensions: { width, height },
          };

          // Add the object to the result array
          filesWithDimensions.push(fileWithDimensions);

          // Continue to the next file
          resolve(readNextFile(index + 1));
        };
      };

      reader.readAsDataURL(file);
    });
  };

  await readNextFile(0);
  return filesWithDimensions;
}

export function convertToCamelCase(list: string[]) {
  return list.map((value) => {
    let res = value;
    if (value.includes(" ")) {
      const [first, second] = value.split(" ");
      res = first.concat(capitalizeFirstLetter(second));
    }
    return res;
  });
}
