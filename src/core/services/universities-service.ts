import { University } from '../models/univercity.model';

export async function getUniversities(country: string): Promise<University[]> {
  const options = {
    method: 'GET',
  };

  const queryParams = new URLSearchParams({
    country,
  });

  const res: Response = await fetch(
    `${process.env.REACT_APP_UNIVERSITIES_API_URL}/search?${queryParams}`,
    options,
  );

  return res.json() as Promise<University[]>;
}
