export const randomDate = () => {
  const random = Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000);
  const isPositive = Math.random() > 0.5;
  const todayTimestamp = new Date().getTime();
  return todayTimestamp + (isPositive ? random : -random);
}

export const calculateDate = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  return date.toISOString().split('T')[0];
}