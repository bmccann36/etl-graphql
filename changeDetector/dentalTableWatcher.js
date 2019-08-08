
const { AttributeValue } = require('dynamodb-data-types');

module.exports.main = async (event) => {
  const itemAttributes = AttributeValue.unwrap(event.Records[0].dynamodb.NewImage);

  
  const dentalRecordId = itemAttributes.id;
  
  console.log(dentalRecordId);

};
