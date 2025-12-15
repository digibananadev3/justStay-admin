import { LuNetwork } from 'react-icons/lu';
import { LuArrowRight } from 'react-icons/lu';
const TreeComponent = ({
  userName,
  join
}) => {
  return (
    <div className="bg-[#F9FAFB] rounded-xl flex justify-between items-center p-3">
      <div className="flex items-center">
        <LuNetwork className="text-[16px] text-[#009689]"/>
        <div className="pl-4">
          <p className="font-medium text-[14px] leading-4 tracking-[0px] text-[#101828]">{userName}</p>
          <p className="text-[12px] leading-4 tracking-[0px]">{join}</p>
        </div>
      </div>
      <LuArrowRight className="text-[#99A1AF] text-[16px]" />
    </div>
  )
}

const GenealogyTree = () => {
  return(
    <>
      <p className="font-medium text-[12px] leading-4 tracking-[0px] text-[#364153] mb-2">Genealogy Tree (Level 1)</p>
      <TreeComponent
        userName={"User 1"}
        join={"Joined: Dec 16, 2024 • Earned: ₹500"}
      />
    </>
  )
}

export default GenealogyTree;