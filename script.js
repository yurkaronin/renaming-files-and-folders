const fs = require('fs');
const path = require('path');

const folderPath = './folder'; // замените на путь к вашей папке
const searchTerm = '[SW.BAND]'; // замените на слово или фразу, которую нужно удалить

function renameFilesRecursive(currentPath) {
  fs.readdir(currentPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        if (stats.isDirectory()) {
          // Рекурсивно переименовываем вложенную папку
          renameFilesRecursive(filePath);

          // Переименовываем текущую папку
          const folderName = path.basename(filePath);
          const folderNameWithoutSearchTerm = folderName.replace(searchTerm, '').trim();
          const newFolderPath = path.join(currentPath, folderNameWithoutSearchTerm);

          fs.rename(filePath, newFolderPath, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`Папка "${filePath}" переименована в "${newFolderPath}"`);
            }
          });
        } else {
          const fileExtension = path.extname(filePath);
          const fileNameWithoutExtension = path.basename(filePath, fileExtension);

          if (fileNameWithoutExtension.includes(searchTerm)) {
            const newFileName = fileNameWithoutExtension.replace(searchTerm, '').trim();
            const newFilePath = path.join(currentPath, newFileName + fileExtension);

            fs.rename(filePath, newFilePath, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log(`Файл "${filePath}" переименован в "${newFilePath}"`);
              }
            });
          }
        }
      });
    });
  });
}

renameFilesRecursive(folderPath);

