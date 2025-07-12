import { useEffect, useState } from 'react';

export function useUserProfile(username: string | null) {
  const [profile, setProfile] = useState<{ fullName?: string } | null>(null);

  useEffect(() => {
    if (!username) return;

    fetch(`/api/users/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, [username]);

  return profile;
}
