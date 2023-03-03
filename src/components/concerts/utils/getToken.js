const endPoint = process.env.REACT_APP_TOKEN_ENDPOINT;
const room_id = process.env.REACT_APP_ROOM_ID;

export default async function getToken(role) {
  const response = await fetch("https://prod-in2.100ms.live/hmsapi/grandstaff-concerts.app.100ms.live/api/token", {
    method: 'POST',
    body: JSON.stringify({
      user_id: '5fc62c5872909272bf9995e1', // User ID assigned by you (different from 100ms' assigned id)
      role: role, // listener , speaker , moderator
      room_id: "63e9f2cdda7e7ca812840c78",
    }),
  });

  const { token } = await response.json();

  return token;
}
