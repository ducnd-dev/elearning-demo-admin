import { faker } from '@faker-js/faker';

export function formatStringToDate(dateString) {
  var year = dateString.substring(0, 4);
  var month = dateString.substring(4, 6);
  var day = dateString.substring(6, 8);
  return new Date(year, month - 1, day);
}

export function formatDateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
}

export function formatGAData(response) {
  var data = []
  if (response.rows) {
    data = response.rows.map((row) => {
      return {
        item: row.dimensionValues[0].value,
        value: parseInt(row.metricValues[0].value),
      };
    });
    data.sort((a, b) => b.value - a.value);
  }
  return data
}

export function generateUniqueCollorArray(length) {
  const uniqueArray = [];
    
    while (uniqueArray.length < length) {
        const newItem = faker.color.rgb(); 
        if (!uniqueArray.includes(newItem)) { 
            uniqueArray.push(newItem); 
        }
    }
    return uniqueArray;
}

export function getPercentageData(data) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  return data.map((item) => {
    return {
      item: item.item,
      percentage: ((item.value / total) * 100).toFixed(2) + '%',
      value: item.value
    };
  });
}

export function getMockAPITrafficAdmin () {
  const mockData = faker.helpers.multiple(() => {
      return {
          apiName: faker.helpers.arrayElement(['api/v1/users', 'api/v1/products', 'api/v1/orders', 'api/v1/reviews']),
          count: faker.number.int({ min: 0, max: 100}),
          type: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE'])
      }
  }, {count: 10})
  return mockData
}

export function getMockApiTrafficAdminByUser () {
  const mockData = faker.helpers.multiple(() => {
      return {
          account: faker.person.firstName(),
          count: faker.number.int({ min: 0, max: 100}),
      }
  }, {count: 20})
  return mockData
}

export function getMockApiGetListUsers () {
  const mockData = faker.helpers.multiple(() => {
      return {
          id: faker.string.uuid(),
          username: faker.person.firstName(),
      }
  }, {count: 10})
  return mockData
}

export function getMockApiGetListAPIs () {
  const mockData = faker.helpers.multiple(() => {
      return {
          id: faker.string.uuid(),
          apiName: faker.helpers.arrayElement(['api/v1/users', 'api/v1/products', 'api/v1/orders', 'api/v1/reviews']),
      }
  }, {count: 10})
  return mockData
}

export function getMockApiGetTrafficHistory () {
  const mockData = faker.helpers.multiple(() => {
      return {
          userId: faker.string.uuid(),
          username: faker.person.firstName(),
          apiName: faker.helpers.arrayElement(['api/v1/users', 'api/v1/products', 'api/v1/orders', 'api/v1/reviews']),
          apiId: faker.string.uuid(),
          lastAccess: formatDateToString(faker.date.recent()),
          count: faker.number.int({ min: 0, max: 100}),
      }
  }, {count: 10})
  return mockData
}