import '../styles/TodaysClassPage.scss';
import { useTodaysClass } from "../hooks/useTodaysClass";
import { MemberDTO } from "../types/Member";
import Toast from '../components/Toast';

export default function TodaysClassPage() {
    const {
        allMembers,
        attendedMembers,
        selectedMemberId,
        handleCardClick,
        handleRemoveAttendance,
        handleAttendClick,
        searchTerm,
        setSearchTerm,
        selectedInstructor,
        setSelectedInstructor,
        filterMembers,
        staffMembers,
        toast,
        setToast,
    } = useTodaysClass();    

    return (
        <div className="todays-class-page">
            <h1>本日のクラス</h1>
            <p className="date">
                {new Date().toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                })}
            </p>

            <div className="instructor-selector">
                <label htmlFor="instructor">本日のスタッフ:</label>
                <select 
                id="instructor"
                value={selectedInstructor || ''}
                onChange={(e) => setSelectedInstructor(Number(e.target.value) || null)}>
                    <option value="">選択してください</option>
                    {staffMembers.map(staff => (
                        <option key={staff.id} value={staff.id}>
                            {staff.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="class-container">
                {/* left sidebar - attended members */}
                <aside className="attended-sidebar">
                    <h2>出席者 ({attendedMembers.length}名)</h2>
                    <ul className="attended-list">
                        {/* TODO list of attended members */}
                        {attendedMembers.map((member: MemberDTO) =>  (
                            <li key={member.id} className="attended-item">
                                <div className="attended-info">
                                    <span className="attended-name">{member.name}</span>
                                    <span className="attended-furigana">{member.furigana}</span>
                                </div>
                                <button className="remove-btn"
                                onClick={() => handleRemoveAttendance(member.id)}
                                >
                                    削除
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* main area - member cards */}
                <div className="member-cards-area">
                    <div className="search-bar">
                        <input
                        type="text"
                        placeholder='会員を検索'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="cards-grid">
                        {/* TODO display member cards */}
                        {filterMembers.length === 0 ? (
                            <div className="no-results">
                                検索結果がみつかりませんでした
                            </div>
                        ) : (
                        filterMembers.map((member: MemberDTO) => {
                            const hasAttended = attendedMembers.some(m => m.id === member.id);
                            const isSelected = selectedMemberId === member.id;

                            return (
                                <div
                                key={member.id}
                                className={`member-card
                                    ${hasAttended ? 'attended' : ''}
                                    ${isSelected ? 'selected' : ''}
                                `}
                                onClick={() => handleCardClick(member.id)}
                                >
                                    <div className="card-photo">
                                        <img
                                     src={member.photoUrl}
                                     alt={member.name}
                                     onError={(e) => {
  e.currentTarget.src =
   'https://ui-avatars.com/api/?name='
    + member.name
    + '&size=80&background=e5e5e5&color=333333';
}}
                                    />
                                    </div>
                                    
                                    <div className="card-info">
                                        {member.name
                                        ? <>
                                        <p className="name-kanji">{member.name}</p>
                                        <p className="name-furigana">{member.furigana}</p>
                                        </>
                                        : <p className="name-alphabet">{member.alphabetName}</p>
                                        }                                        
                                    </div>

                                    {/* attend button - shows when selected */}
                                    {isSelected && !hasAttended && (
                                        <button className="attend-btn"
                                        onClick={(e) => handleAttendClick(member.id, e, member.id === selectedInstructor)}>
                                            出席
                                        </button>
                                    )}
                                    
                                </div>
                            );
                        })
                        )}
                    </div>
                </div>
            </div>
            {toast && (
                                        <Toast
                                        message={toast.message}
                                        type={toast.type}
                                        onClose={() => setToast(null)}
                                        />
                                    )}
        </div>
    )
}