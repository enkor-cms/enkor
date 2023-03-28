import { listSpots } from '@/features/spots';
import { createClient } from '@/lib/supabase/browser';

export default async function handler(req, res) {
  const supabase = createClient();
  const { spots, error } = await listSpots({
    client: supabase,
    limit: 1000,
  });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const distanceThreshold = 0.1; // Adjust this value according to your clustering needs

  const clusters = [];

  spots.forEach((spot) => {
    let addedToExistingCluster = false;

    for (const cluster of clusters) {
      if (isNear(cluster, spot, distanceThreshold)) {
        cluster.spots.push(spot);
        cluster.latitude += spot.location.latitude;
        cluster.longitude += spot.location.longitude;
        cluster.latitude /= cluster.spots.length;
        cluster.longitude /= cluster.spots.length;
        addedToExistingCluster = true;
        break;
      }
    }

    if (!addedToExistingCluster) {
      clusters.push({
        spots: [spot],
        latitude: spot.location.latitude,
        longitude: spot.location.longitude,
      });
    }
  });

  res.status(200).json(clusters);
}

function isNear(cluster, spot, distanceThreshold) {
  const dLat = cluster.latitude - spot.location.latitude;
  const dLon = cluster.longitude - spot.location.longitude;
  const distance = Math.sqrt(dLat * dLat + dLon * dLon);

  return distance <= distanceThreshold;
}
