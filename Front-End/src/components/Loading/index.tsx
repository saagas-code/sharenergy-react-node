import {AiOutlineLoading3Quarters} from "react-icons/ai"


export const Loading = () => {
  return (
    <div className="w-full flex justify-center">
      <AiOutlineLoading3Quarters className="animate-spin" />
    </div>
  )
}