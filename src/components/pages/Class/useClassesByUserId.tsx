import useClasses from './useClasses';

export default function useClassesByUserId({ userId, parentUserId = undefined }) {
  return useClasses({
    requestParams: parentUserId
      ? {
          FilterExpression: '#userId = :userId OR #parentUserId = :parentUserId',
          ExpressionAttributeNames: {
            '#userId': 'userId',
            '#parentUserId': 'parentUserId'
          },
          ExpressionAttributeValues: {
            ':userId': userId,
            ':parentUserId': parentUserId
          }
        }
      : {
          FilterExpression: '#userId = :userId',
          ExpressionAttributeNames: {
            '#userId': 'userId'
          },
          ExpressionAttributeValues: {
            ':userId': userId
          }
        }
  });
}
