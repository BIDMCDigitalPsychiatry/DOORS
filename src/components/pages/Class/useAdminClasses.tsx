import useClasses from './useClasses';

export default function useAdminClasses() {
  return useClasses({
    requestParams: {
      FilterExpression: '#userType = :userType',
      ExpressionAttributeNames: {
        '#userType': 'userType'
      },
      ExpressionAttributeValues: {
        ':userType': 'Admin'
      }
    }
  });
}
