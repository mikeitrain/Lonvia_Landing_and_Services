// Utility functions for location detection and testing

export interface LocationData {
  country: string;
  countryCode: string;
  city?: string;
  region?: string;
  timezone?: string;
}

interface GeolocationData {
  country_name?: string;
  country_code?: string;
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
}

export const testLocationDetection = async (): Promise<LocationData | null> => {
  const services = [
    {
      name: 'ipapi.co',
      url: 'https://ipapi.co/json/',
      transform: (data: GeolocationData) => ({
        country: data.country_name || 'Unknown',
        countryCode: data.country_code || 'Unknown',
        city: data.city,
        region: data.region,
        timezone: data.timezone
      })
    },
    {
      name: 'ipinfo.io',
      url: 'https://ipinfo.io/json',
      transform: (data: GeolocationData) => ({
        country: data.country || 'Unknown',
        countryCode: data.country || 'Unknown',
        city: data.city,
        region: data.region,
        timezone: data.timezone
      })
    }
  ];

  for (const service of services) {
    try {
      const response = await fetch(service.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        continue;
      }
      
      const data = await response.json();
      const locationData = service.transform(data);
      
      return locationData;
    } catch {
      continue;
    }
  }
  
  return null;
};

// Function to get browser language information
export const getBrowserLanguageInfo = () => {
  return {
    language: navigator.language,
    languages: navigator.languages,
    userAgent: navigator.userAgent,
    platform: navigator.platform
  };
};

// Function to simulate different locations for testing
export const simulateLocation = (): void => {
  // This is for testing purposes only
  localStorage.removeItem('preferredLanguage'); // Clear saved preference
  window.location.reload(); // Reload to trigger detection
}; 