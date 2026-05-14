with open("src/pages/Feed.tsx", "r") as f:
    content = f.read()

content = content.replace(
    "import UniversalSearch from '../components/UniversalSearch'",
    "import UniversalSearch from '../components/UniversalSearch'\nimport LikeWidget from '../components/LikeWidget'"
)

# Remove old handleLike function
import re
content = re.sub(r'const handleLike = async \(post: Post\) => \{.*?catch \(e\) \{\n      console.error\("Like error:", e\);\n    \}\n  \};', '', content, flags=re.DOTALL)

# Replace the heart button + likes count
old_like_html = """<button 
                      onClick={() => handleLike(post)}
                      style={{ background: 'none', border: 'none', color: post.likes.includes(user?.uid) ? '#ff4444' : 'white', fontSize: '1.5rem', cursor: 'pointer', padding: 0 }}
                    >
                      {post.likes.includes(user?.uid) ? '🧡' : '🤍'}
                    </button>"""
new_like_html = """<LikeWidget post={post} user={user} onAuthNeeded={() => setShowAuthModal(true)} />"""
content = content.replace(old_like_html, new_like_html)
content = content.replace("<div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{post.likes.length} Likes</div>", "")

# Same for selectedFullPost modal
old_full_like = """<span style={{ color: '#ff6600', fontWeight: 'bold' }}>🧡 {selectedFullPost.likes.length} Likes</span>"""
new_full_like = """<span style={{ color: '#ff6600', fontWeight: 'bold' }}><LikeWidget post={selectedFullPost} user={user} onAuthNeeded={() => setShowAuthModal(true)} /></span>"""
content = content.replace(old_full_like, new_full_like)

with open("src/pages/Feed.tsx", "w") as f:
    f.write(content)
