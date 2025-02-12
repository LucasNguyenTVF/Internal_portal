import { memo, useCallback, useRef } from 'react'
import arrowIcon from "../../assets/arrow.svg";
import InfoDetailModal from '../modal/InfoDetailModal';
const ChartLevel = ({ nodes,
  level,
  toggleLevel,
  isVisible,
  hasChildren, isShow }) => {
  const detailModalRef = useRef(null)
  const onClickDetail = useCallback((data) => () => {
    detailModalRef?.current?.showModal(data)
  }, [])

  if (!isVisible) return null;

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex flex-row flex-wrap items-center justify-center gap-3">
          {nodes.map((node, index) => (
            <button onClick={onClickDetail(node)} key={index} className="flex justify-center">
              <div className="bg-white rounded-md p-4 border-1 w-36 h-40 shadow-md  border-[#4079aa]">
                <div className="w-13 h-13 rounded-full m-auto overflow-hidden border-dashed border-2 border-gray-300">
                  <img src={node?.data?.image} alt={node?.data?.name} />
                </div>
                <div className="mt-3">
                  <div className="text-sm font-semibold text-[#004c8f]">
                    {node?.data?.name}
                  </div>
                  <div className="text-xs text-gray-800">
                    {node?.data?.title}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        {hasChildren && (
          <>
            <img
              onClick={() => toggleLevel(level)}
              src={arrowIcon}
              className={`w-6 h-6 transition-transform duration-300 ${isShow ? "rotate-180" : ""
                }`}
              alt="arrow icon"
            />
          </>
        )}
      </div>
      <InfoDetailModal ref={detailModalRef} />
    </>
  );
}

export default memo(ChartLevel)
