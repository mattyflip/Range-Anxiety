import re

with open("src/pages/CommunityView.tsx", "r") as f:
    content = f.read()

content = content.replace(
    "import UniversalSearch from '../components/UniversalSearch'",
    "import UniversalSearch from '../components/UniversalSearch'\nimport UpvoteWidget from '../components/UpvoteWidget'"
)

# Remove the old handleVote logic completely
content = re.sub(r'const handleVote = async \(thread: Thread, value: number\) => \{.*?\} else if \(hasUpvoted\) \{.*?\}\n    \} catch \(e\) \{\n      console\.error\("Vote error:", e\);\n    \}\n  \};', '', content, flags=re.DOTALL)

# Replace the upvote buttons
old_button = """<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                   <button onClick={() => handleVote(thread, 1)} style={{ background: 'none', border: 'none', color: thread.upvotedBy?.includes(user?.uid) ? '#4ade80' : '#444', cursor: 'pointer', fontSize: '1.2rem' }}>🔋</button>
                   <span style={{ color: 'white', fontWeight: 'bold' }}>{thread.score || 0}</span>
                   <button onClick={() => handleVote(thread, -1)} style={{ background: 'none', border: 'none', color: thread.downvotedBy?.includes(user?.uid) ? '#ff4444' : '#444', cursor: 'pointer', fontSize: '1.2rem' }}>🪫</button>
                 </div>"""

new_button = """<UpvoteWidget communityId={communityId || ''} threadId={thread.id} user={user} onAuthNeeded={() => setShowAuthModal(true)} />"""

content = content.replace(old_button, new_button)

with open("src/pages/CommunityView.tsx", "w") as f:
    f.write(content)
