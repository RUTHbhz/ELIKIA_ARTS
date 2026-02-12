import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '../config/firebase';
import { artworks, artists, stories } from '../data/mockData';

export const seedDatabase = async () => {
  const batch = writeBatch(db);

  // Seed Artists
  artists.forEach((artist) => {
    const artistRef = doc(db, 'artists', artist.id);
    batch.set(artistRef, artist);
  });

  // Seed Artworks
  artworks.forEach((artwork) => {
    const artworkRef = doc(db, 'artworks', String(artwork.id));
    batch.set(artworkRef, artwork);
  });

  // Seed Journal/Stories
  stories.forEach((story) => {
    const storyRef = doc(db, 'journal', String(story.id));
    batch.set(storyRef, story);
  });

  try {
    await batch.commit();
    console.log('Database seeded successfully with artists, artworks, and stories!');
    return { success: true, message: 'Base de données initialisée avec succès !' };
  } catch (error) {
    console.error('Error seeding database:', error);
    return { success: false, message: 'Erreur lors de l\'initialisation : ' + error.message };
  }
};
