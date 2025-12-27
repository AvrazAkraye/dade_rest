import BranchMenu from '@/components/BranchMenu';

const branchConfig = {
  id: 2,
  name: 'سيجي',
  name_en: 'Seje La Casetta',
  description: 'دهوك',
  phone: '07502916665',
  instagram: '@lacasetta_coffee',
  location: 'Seche, Duhok - Iraq'
};

export default function SecheBranchPage() {
  return <BranchMenu config={branchConfig} />;
}
