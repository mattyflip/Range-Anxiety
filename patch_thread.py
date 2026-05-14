import re

with open("src/pages/ThreadView.tsx", "r") as f:
    content = f.read()

content = content.replace(
    "import UniversalSearch from '../components/UniversalSearch'",
    "import UniversalSearch from '../components/UniversalSearch'\nimport UpvoteWidget from '../components/UpvoteWidget'"
)

# Remove the old handleUpvote logic completely
content = re.sub(r'const handleUpvote = async \(\) => \{.*?\} else if \(hasUpvoted\) \{.*?\}\n    \} catch \(e\) \{\n      console\.error\("Upvote error:", e\);\n    \}\n  \};', '', content, flags=re.DOTALL)

# Replace the upvote buttons
old_button = """<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                <button 
                  onClick={handleUpvote} 
                  style={{ background: 'none', border: 'none', color: thread.upvotedBy?.includes(user?.uid) ? '#4ade80' : '#444', cursor: 'pointer', fontSize: '1.5rem', filter: thread.upvotedBy?.includes(user?.uid) ? 'none' : 'grayscale(100%)' }}
                  title="Upvote"
                >
                  🔋
                </button>
                <span style={{ color: thread.upvotedBy?.includes(user?.uid) ? '#4ade80' : '#888', fontWeight: 'bold' }}>{(thread.upvotedBy?.length || 0) - (thread.downvotedBy?.length || 0)}</span>
              </div>"""

new_button = """<UpvoteWidget communityId={communityId || ''} threadId={threadId || ''} user={user} onAuthNeeded={() => setShowAuthModal(true)} />"""

content = content.replace(old_button, new_button)

with open("src/pages/ThreadView.tsx", "w") as f:
    f.write(content)
