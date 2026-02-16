import '../styles/MembersListPage.scss';
import { useMembersList } from "../hooks/useMembersList";

export default function MemberListPage() {
    const {
        filterMembers,
        searchTerm,
        setSearchTerm,
        expandedMemberId,
        setExpandedMemberId,
        getMembershipTypeLabel,
    } = useMembersList();

    return (
        <div className="members-list-page">
            <h1>会員一覧</h1>
            {/* search bar */}
            <div className="search-bar">
                <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* members table */}
            <div className="members-table">
                <div className="table-header">
                    <div></div>
                    <div>写真</div>
                    <div>帯</div>
                    <div>氏名</div>
                    <div>ふりがな</div>
                    <div>ローマ字</div>
                    <div>メンバーシップ</div>
                    <div>支払状況</div>
                </div>

                {filterMembers.length === 0 ? (
                    <div className="no-results">
                        検索結果が見つかりませんでした
                    </div>
                    // CHECK THIS ONE
                ) : ( filterMembers.map(member => (
                    <div key={member.id}>
                    <div className={`member-row ${expandedMemberId === member.id ? 'expanded' : ''}`}>
                        {/* Expand arrow */}
                        <div className="expand-arrow" onClick={() => setExpandedMemberId(
                            expandedMemberId === member.id ? null : member.id
                        )}
                        >
                            {expandedMemberId === member.id ? '▼' : '▶'}
                        </div>

                        {/* Photo */}
                        <div className="member-photo">
                            <img
                            src={member.photoUrl}
                            alt={member.name}                            
                            />
                        </div>

                        {/* Belt indicator */}
                        <div className="belt-indicator">
                            <span className={`belt-circle ${member.beltRank.toLowerCase()}`}></span>
                        </div>

                        {/* Name (kanji) */}
                        <div className="member-name">{member.name}</div>

                        {/* Furigana */}
                        <div className="member-furigana">{member.furigana}</div>

                        {/* Alphabet name */}
                        <div className="member-alphabet">{member.alphabetName}</div>

                        {/* Membership type */}
                        <div className="membership-type">
                            {getMembershipTypeLabel(member.membershipType)}
                        </div>

                        {/* Payment status */}
                        <div className="payment-status">
                            <span className={`value ${member.paymentStatus ? 'status-paid' : 'status-unpaid'}`}>
                                {member.paymentStatus ? '✓ 支払済み' : '✗ 未払い'}
                            </span>
                        </div>
                    </div>    
                        

                        {expandedMemberId === member.id && (
                            <div className="member-details">
                                <div className="details-content">
                                    <div className="details-photo">
                                        <img src={member.photoUrl} alt={member.name} />
                                    </div>
                                    <div className="details-info">
                                        <div className="info-row">
                                            <span className="label">氏名:</span>
                                            <span className="value">{member.name}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="label">ふりがな:</span>
                                            <span className="value">{member.furigana}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="label">ローマ字:</span>
                                            <span className="value">{member.alphabetName}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="label">生年月日:</span>
                                            {new Date(member.dateOfBirth).toLocaleDateString('ja-JP', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                        </div>
                                        <div className="info-row">
                                            <span className="label">電話番号:</span>
                                            <span className="value">{member.phone}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="label">LINE ID:</span>
                                            <span className="value">{member.lineId}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="label">メールアドレス:</span>
                                            <span className="value">{member.email}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="label">帯:</span>
                                            <span className="value">{member.beltRank}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="label">メンバーシップ:</span>
                                            <span className="value">
                                                {getMembershipTypeLabel(member.membershipType)}
                                            </span>
                                        </div>
                                        <div className="info-row">
                                            <span className="label">支払状況:</span>
                                            <span className={`value ${member.paymentStatus ? 'status-paid' : 'status-unpaid'}`}>
                                                {member.paymentStatus ? '✓ 支払済み' : '✗ 未払い'}
                                            </span>
                                        </div>
                                        <div className="info-row">
                                            <span className="label">会員状況:</span>
                                            <span className={`value ${member.active ? 'status-active' : 'status-inactive'}`}>
                                                {member.active ? '✓ 有効' : '休会中'}
                                            </span>
                                        </div>
                                        <div className="info-row">
                                            <span className="label">入会日:</span>
                                            <span className="value">
                                                {new Date(member.joinedAt).toLocaleDateString('ja-JP', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        <div className="details-actions">
                                            <button className="edit-button">編集</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))
                )}
            </div>
        </div>
    )
}