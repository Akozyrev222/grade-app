const fs = require('fs');
const path = require('path');

const changes = [
  {
    source: path.join(__dirname, 'geocoderModule.txt'),
    target: path.join(__dirname, 'node_modules', '@timwangdev', 'react-native-geocoder', 'android', 'src', 'main', 'java', 'com', 'timwangdev', 'reactnativegeocoder', 'GeocoderModule.kt')
  },
  {
    source: path.join(__dirname, 'libs.versions.txt'),
    target: path.join(__dirname, 'node_modules', '@react-native', 'gradle-plugin', 'gradle', 'libs.versions.toml')
  }
];

changes.forEach(change => {
  const { source, target } = change;

  console.log('Source Path:', source);
  console.log('Target File Path:', target);

  fs.readFile(source, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${source}:`, err);
      return;
    }

    fs.writeFile(target, data, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing to ${target}:`, err);
        return;
      }

      console.log(`${target} has been replaced successfully.`);
    });
  });
});