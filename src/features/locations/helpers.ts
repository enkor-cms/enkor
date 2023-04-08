import { toast } from 'react-toastify';
import { COUNTRIES } from './constant';

export const findCountryIdFromName = (name: string) => {
  const country = COUNTRIES.find((country) => country.name === name);
  return country?.id;
};

export function getDeltaLatLon(
  latitudeInDegrees: number,
  radiusInMeters: number,
): { deltaLatitude: number; deltaLongitude: number } {
  const EARTH_RADIUS_METERS = 6371000;
  const DEGREE_TO_RADIAN = Math.PI / 180;
  const RADIAN_TO_DEGREE = 180 / Math.PI;

  const latitudeInRadians = latitudeInDegrees * DEGREE_TO_RADIAN;

  const deltaLatitude =
    (radiusInMeters / EARTH_RADIUS_METERS) * RADIAN_TO_DEGREE;
  const deltaLongitude =
    (radiusInMeters / (EARTH_RADIUS_METERS * Math.cos(latitudeInRadians))) *
    RADIAN_TO_DEGREE;

  return { deltaLatitude, deltaLongitude };
}

export async function getAddressFromOpenStreetMap(lat: number, lng: number) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
    );
    const data = await response.json();
    const city = data.address.city || data.address.town || data.address.village;
    const department = data.address.state;
    const country = data.address.country;
    return { city, department, country };
  } catch (error) {
    toast.error('Must be a valid address');
  }
}
