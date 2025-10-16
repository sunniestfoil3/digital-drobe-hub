export interface Item {
  id: string;
  name: string;
  creator: string;
  price: string;
  image: string;
  description: string;
  badge?: string;
}

export interface UserProfile {
  loggedIn: boolean;
  username: string;
  inventory: string[];
}

const ITEMS_DB_KEY = 'items_db';
const USER_PROFILE_KEY = 'user_profile';

// Initial seed data
const initialItems: Item[] = [
  {
    id: 'item-01',
    name: 'Cyber Bomber Jacket',
    creator: 'NeoDesigner',
    price: '0.8',
    image: '/src/assets/jacket-cyber.jpg',
    description: 'Uma jaqueta bomber cyberpunk com tecido holográfico e costuras com brilho neon azul. Perfeita para seu avatar explorar o metaverso com estilo.',
    badge: 'Exclusivo',
  },
  {
    id: 'item-02',
    name: 'Anti-Gravity Sneakers',
    creator: 'FutureKicks',
    price: '1.2',
    image: '/src/assets/sneakers-cyber.jpg',
    description: 'Tênis com tecnologia anti-gravidade e materiais translúcidos com fluxos de dados cyan. O futuro da moda digital nos seus pés.',
    badge: 'Novo',
  },
  {
    id: 'item-03',
    name: 'Holographic Dress',
    creator: 'DigitalCouture',
    price: '2.5',
    image: '/src/assets/dress-holo.jpg',
    description: 'Vestido holográfico com partículas digitais flutuantes e detalhes em neon cyan. Elegância e tecnologia em perfeita harmonia.',
  },
  {
    id: 'item-04',
    name: 'Neon Visor AR',
    creator: 'LunaCyber',
    price: '0.5',
    image: '/src/assets/creator-1.jpg',
    description: 'Visor de realidade aumentada com moldura em neon rosa. Perfeito para ver o mundo digital de uma nova perspectiva.',
    badge: 'Novo',
  },
  {
    id: 'item-05',
    name: 'Tech Implant Set',
    creator: 'NeonBlade',
    price: '1.8',
    image: '/src/assets/creator-2.jpg',
    description: 'Conjunto completo de implantes tecnológicos e acessórios cyber. Transforme seu avatar em um verdadeiro cyberpunk.',
  },
  {
    id: 'item-06',
    name: 'Holographic Hair FX',
    creator: 'AuroraMatrix',
    price: '0.7',
    image: '/src/assets/creator-3.jpg',
    description: 'Efeitos holográficos para cabelo com cores dinâmicas e animações. Destaque-se com um visual único e futurista.',
  },
];

const defaultUserProfile: UserProfile = {
  loggedIn: false,
  username: 'Visitante',
  inventory: [],
};

// Initialize localStorage with seed data if needed
export const initializeMarketplace = (): void => {
  if (!localStorage.getItem(ITEMS_DB_KEY)) {
    localStorage.setItem(ITEMS_DB_KEY, JSON.stringify(initialItems));
  }
  if (!localStorage.getItem(USER_PROFILE_KEY)) {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(defaultUserProfile));
  }
};

// Items DB functions
export const getAllItems = (): Item[] => {
  const itemsJson = localStorage.getItem(ITEMS_DB_KEY);
  return itemsJson ? JSON.parse(itemsJson) : [];
};

export const getItemById = (id: string): Item | null => {
  const items = getAllItems();
  return items.find(item => item.id === id) || null;
};

// User Profile functions
export const getUserProfile = (): UserProfile => {
  const profileJson = localStorage.getItem(USER_PROFILE_KEY);
  return profileJson ? JSON.parse(profileJson) : defaultUserProfile;
};

export const updateUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
};

export const connectWallet = (): void => {
  const profile = getUserProfile();
  const randomAddress = Math.random().toString(36).substring(2, 8);
  profile.loggedIn = true;
  profile.username = `Usuário-0x${randomAddress}`;
  updateUserProfile(profile);
};

export const disconnectWallet = (): void => {
  updateUserProfile(defaultUserProfile);
};

export const purchaseItem = (itemId: string): boolean => {
  const profile = getUserProfile();
  
  if (!profile.loggedIn) {
    return false;
  }
  
  if (profile.inventory.includes(itemId)) {
    return false;
  }
  
  profile.inventory.push(itemId);
  updateUserProfile(profile);
  return true;
};

export const hasItem = (itemId: string): boolean => {
  const profile = getUserProfile();
  return profile.inventory.includes(itemId);
};

export const getUserInventory = (): Item[] => {
  const profile = getUserProfile();
  const allItems = getAllItems();
  return profile.inventory
    .map(itemId => allItems.find(item => item.id === itemId))
    .filter((item): item is Item => item !== undefined);
};
