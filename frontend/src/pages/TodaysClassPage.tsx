import { useTodaysClass } from "../hooks/useTodaysClass";

export default function TodaysClassPage() {
    const {
        allMembers,
        attendedMembers,
        selectedMemberId,
        handleCardClick,
        handleRemoveAttendance,
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

            <div className="class-container">
                {/* left sidebar - attended members */}
                <aside className="attended-sidebar">
                    <h2>出席者 ({attendedMembers.length})</h2>
                    <ul>
                        {/* TODO list of attended members */}
                        {attendedMembers.map(member => (
                            <li key={member.id} className="attended-member">
                                <div className="member-info">
                                    <span className="name">{member.name}</span>
                                    <span className="furigana">{member.furigana}</span>
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
                    <div className="cards-grid">
                        {/* TODO display member cards */}
                        {allMembers.map(member => {
                            const hasAttended = attendedMembers.some(m => m.id === member.id);
                            const isSelected = selectedMemberId === member.id;

                            return (
                                <div
                                key={member.id}
                                className={`member-card ${hasAttended ? 'attended' : ''} ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleCardClick(member.id)}
                                >
                                    <img src={member.photoUrl} alt={member.name} />
                                    <div className="card-info">
                                        {member.name && <p className="name-kanji">{member.name}</p>}
                                        {member.furigana && <p className="name-furigana">{member.furigana}</p>}
                                        {!member.name && <p className="name-alphabet">{member.alphabetName}</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}