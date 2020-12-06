import useEvents from './useEvents';

export default function useGroupEvents({ groupId }) {
  return useEvents({
    requestParams: {
      FilterExpression: '#groupId = :groupId',
      ExpressionAttributeNames: {
        '#groupId': 'groupId'
      },
      ExpressionAttributeValues: {
        ':groupId': groupId
      }
    }
  });
}
