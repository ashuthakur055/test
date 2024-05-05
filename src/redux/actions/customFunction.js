//function to capitalize first letter of string
export function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
//function to capitalize first letter of a each word of string
export function capitalize(str, lower = false) {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
}
//custom function to generate random password
export function generateRandomPassword() {
  const alpha = 'abcdefghijklmnopqrstuvwxyz';
  const calpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const num = '1234567890';
  const specials = ',.!@#$%^&*';
  const options = [alpha, num, alpha, specials, calpha, calpha, num, num, specials, alpha];
  let opt, choose;
  let randomPass = '';
  for (let i = 0; i < 10; i++) {
    opt = Math.floor(Math.random() * options.length);
    choose = Math.floor(Math.random() * options[opt].length);
    randomPass = randomPass + options[opt][choose];
    options.splice(opt, 1);
  }
  return randomPass;
}
//custom function to filter the data from associative type array
export function fieldfilter(data, filter) {
  let val;
  data.map(item => {
    if (val) return;
    if (item.value === filter) {
      val = item.text;
    }
  });
  return val;
}
//for image description
export function fieldsValueArray(supportFieldData, field, allSupportData) {
  let fieldArray = [];
  let dataArray = [];
  supportFieldData.filter(element => {
    if (element.support_table_id.fields == field) {
      fieldArray.push(element.support_table_id.id);
    }
    if (field == 'support_table_data') {
      fieldArray.push(element.support_table_id.id);
    }
  });
  allSupportData.filter(element => fieldArray.includes(element.id) && dataArray.push(element.id));
  return dataArray;
}

export function support_table_data(value = [], imgDesc) {
  let createArray = [];
  let delArray = [];
  let support_table_data = imgDesc && imgDesc['support_table_data'] ? imgDesc['support_table_data'] : [];
  let existingVal = imgDesc && imgDesc['img_sup_data'] ? imgDesc['img_sup_data'] : [];
  let id = imgDesc ? imgDesc.id : '+';
  // Deleted element array
  for (let i = 0; i < existingVal.length; i++) {
    if (!value.includes(existingVal[i]['support_table_id']['id'])) {
      delArray.push(existingVal[i]['id']);
    }
  }
  //new add element array
  for (let i = 0; i < value.length; i++) {
    if (!support_table_data.includes(value[i])) {
      createArray.push({
        image_description_id: id,
        support_table_id: value[i],
      });
    }
  }
  return {
    create: createArray,
    update: [],
    delete: delArray,
  };
}
// geographic_location:manyToManyRelationData(values.geographic_location, imgDesc ? {id:imgDesc.id,data_1:imgDesc.geographic_location,data_2:imgDesc.image_description_geographic_locations}:{},dataOBJ={image_description_id:'',geographic_locations_id:''})
export function manyToManyRelationData(values = [], imgDesc = []) {
  let createArray = [];
  let delArray = [];
  let geographic_location = imgDesc ? imgDesc['geographic_location'] : [];
  let existingVal = imgDesc ? imgDesc['image_description_geographic_locations'] : [];
  let id = imgDesc ? imgDesc.id : '+';
  // Deleted element array
  for (let i = 0; i < existingVal.length; i++) {
    if (!values.includes(existingVal[i])) {
      delArray.push(existingVal[i]);
    }
  }
  //new add element array
  for (let i = 0; i < values.length; i++) {
    if (!geographic_location.includes(values[i])) {
      createArray.push({
        image_description_id: id,
        geographic_locations_id: values[i],
      });
    }
  }
  return {
    create: createArray,
    update: [],
    delete: delArray,
  };
}

//end image description
export function getFile(fileID) {
  try {
    return `${process.env.apiURL}assets/${fileID}`;
  } catch (error) {
    console.log(error, 'errorerrorerrorfetchPossibleValues');
  }
}
//handle file
export const handleFileChange = ({ fileList: [] }) => {};
//handle
export const onRemove = file => {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
};
export const reportData = data => {
  let reportObject = [];
  data.forEach(row => {
    Object.keys(row).forEach(function (key) {
      if (row[key] == null || row[key] == undefined || row[key] == '') {
        row[key] = '-';
      }
    });
    reportObject.push({
      'Print Object ID': row.object_id.id,
      'Collection Name': row.object_id.collections.name,
      Name: row.name,
      ID: row.acq_id,
      Size: row.size,
      Thumbnail: row.thumbnail != '-' ? getFile(row.thumbnail) : 'Not Available',
      'Common Title': row.common_title,
      Object: row.object == '1' ? 'Complete' : 'Incomplete',
      Print: row.print == '1' ? 'Complete' : 'Incomplete',
      'Physical Characteritics': row.phy_char == '1' ? 'Complete' : 'Incomplete',
      Xrf: row.xrf == '1' ? 'Complete' : 'Incomplete',
      Micrometer: row.micrometer == '1' ? 'Complete' : 'Incomplete',
      Glossmeter: row.glossmeter == '1' ? 'Complete' : 'Incomplete',
      Photospectrometer: row.photo_spectro_meter == '1' ? 'Complete' : 'Incomplete',
      'Image Description': row.image_description == '1' ? 'Complete' : 'Incomplete',
      'Mount Characteristics': row.print_mount_conditions == '1' ? 'Complete' : 'Incomplete',
      'Basic Photos': row.basic_photos == '1' ? 'complete' : 'Incomplete',
    });
  });
  return reportObject;
};
