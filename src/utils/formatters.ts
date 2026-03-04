import { format, parseISO } from 'date-fns';
import { Units } from '../types/weather';

export const formatTemperature = (temp: number, units: Units): string => {
  const symbol = units === 'f' ? '°F' : units === 's' ? 'K' : '°C';
  return `${temp}${symbol}`;
};

export const formatSpeed = (speed: number, units: Units): string => {
  if (units === 'f') return `${speed} mph`;
  if (units === 's') return `${speed} m/s`;
  return `${speed} km/h`;
};

export const formatPressure = (pressure: number): string => {
  return `${pressure} mb`;
};

export const formatDistance = (distance: number, units: Units): string => {
  if (units === 'f') return `${distance} miles`;
  return `${distance} km`;
};

export const formatDate = (dateString: string, formatStr: string = 'MMM dd, yyyy'): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch {
    return dateString;
  }
};

export const formatTime = (timeString: string): string => {
  try {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  } catch {
    return timeString;
  }
};

export const formatLocalTime = (localtime: string): string => {
  try {
    const date = parseISO(localtime);
    return format(date, "EEEE, MMMM do 'at' h:mm a");
  } catch {
    return localtime;
  }
};

export const getDayName = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'EEEE');
  } catch {
    return dateString;
  }
};

export const getShortDayName = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'EEE');
  } catch {
    return dateString;
  }
};
