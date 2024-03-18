import axios from 'axios'
import {PUBLIC_NEXT_PUBLIC_UNSPLASH_CLIENT_ID} from '$env/static/public';
const clientId =PUBLIC_NEXT_PUBLIC_UNSPLASH_CLIENT_ID;

const UNSPLASH_ROOT = 'https://api.unsplash.com'

export const getPhotosByQuery = async ({ city }: { city: string }) => {
    console.log(city)
  const { data } = await axios.get(
    `${UNSPLASH_ROOT}/search/photos?page=1&orientation=landscape&query=${city}&client_id=${clientId}`
  )

  return data;
}