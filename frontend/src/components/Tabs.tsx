
interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}
export default function Tabs({activeTab, setActiveTab}: TabsProps) {
    return <>
        <div className="flex justify-left pb-7">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
               <ul className="flex flex-wrap -mb-px">
                  <li className="me-2" onClick={() => setActiveTab('+')}>
                        <a href="#" 
                            className={`${ activeTab === "+" ? "text-peach border-peach":"border-transparent"} inline-block p-4 border-b-2  rounded-t-lg hover:border-light-red `}
                        >
                            +
                        </a>
                  </li>
                  <li className="me-2" onClick={() => setActiveTab('for-you')}>
                        <a href="#" 
                            className={`${ activeTab === "for-you" ? "text-peach border-peach":"border-transparent"} inline-block p-4 border-b-2 rounded-t-lg hover:border-light-red `}
                        >
                            For You
                        </a>
                  </li>
                  <li className="me-2" onClick={() => setActiveTab('following')}>
                        <a href="#" 
                            className={`${ activeTab === "following" ? "text-peach border-peach":"border-transparent"} inline-block p-4 border-b-2  rounded-t-lg hover:border-light-red `}
                        >
                            Following
                        </a>
                  </li>
               </ul>
            </div>
         </div>
    </>
}