import { writeFileSync } from 'fs';

export const writeDataToFile = ({ filename, content }) => {
  writeFileSync(filename, JSON.stringify(content), (writeError) => {
    if (writeError) {
      console.log(writeError);
    }

    console.log(`User was successfully added`);
  });
};
