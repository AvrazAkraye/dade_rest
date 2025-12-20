import BranchMenu from '@/components/BranchMenu';

const branchConfig = {
  id: 1,
  name: 'دهوك',
  name_en: 'Duhok La Casetta',
  description: 'شارع المطاعم - أكري',
  phone: '07509002825',
  instagram: '@lacasetta_coffee',
  location: 'Duhok, Iraq - Akre Restaurant St.'
};

export default function DuhokBranchPage() {
  return <BranchMenu config={branchConfig} />;
}
