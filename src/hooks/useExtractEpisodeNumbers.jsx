import { useMemo } from 'react';

const useExtractEpisodeNumbers = (episodeLinks) => {
  const episodeNumbers = useMemo(() => {
    return episodeLinks.map((link) => {
      const parts = link.split('/');
      return parts[parts.length - 1];
    });
  }, [episodeLinks]);

  return episodeNumbers;
};

export default useExtractEpisodeNumbers;