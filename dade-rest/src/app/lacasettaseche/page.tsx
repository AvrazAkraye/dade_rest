import BranchMenu from '@/components/BranchMenu';

const branchConfig = {
  id: 2,
  name: 'سيجي',
  name_en: 'Seche La Casetta',
  description: 'سيجي - دهوك',
  phone: '07509002825',
  instagram: '@lacasetta_coffee',
  location: 'Seche, Duhok - Iraq'
};

export default function SecheBranchPage() {
  return <BranchMenu config={branchConfig} />;
}
