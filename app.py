from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)
app.secret_key = "game_dev_secret_key"

# Sample Data
PROJECTS = [
    {
        "id": 1,
        "title": "Neon Odyssey",
        "description": "A fast-paced cyberpunk racer with procedural tracks.",
        "image": "/static/images/projects/neon-odyssey.svg",
        "tech": ["Unity", "C#", "HLSL"],
        "link": "#"
    },
    {
        "id": 2,
        "title": "Mystic Woods",
        "description": "An atmospheric puzzle-platformer about light and shadow.",
        "image": "/static/images/projects/mystic-woods.svg",
        "tech": ["Unreal Engine 5", "C++", "Blueprints"],
        "link": "#"
    },
    {
        "id": 3,
        "title": "Void Echoes",
        "description": "A horror experience set in a derelict space station.",
        "image": "/static/images/projects/void-echoes.svg",
        "tech": ["Unity", "C#", "FMOD"],
        "link": "#"
    }
]

BLOG_POSTS = [
    {
        "id": 1,
        "title": "Optimizing Shaders for Mobile",
        "date": "Oct 24, 2023",
        "excerpt": "How I reduced draw calls and optimized fragment shaders for a smooth 60fps experience.",
        "content": "Full content about shader optimization..."
    },
    {
        "id": 2,
        "title": "The Art of Level Design",
        "date": "Sept 12, 2023",
        "excerpt": "Exploring the psychology of player movement and guiding them through environment cues.",
        "content": "Full content about level design..."
    }
]

@app.route('/')
def home():
    return render_template('home.html', projects=PROJECTS[:2])

@app.route('/projects')
def projects():
    return render_template('projects.html', projects=PROJECTS)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/blog')
def blog():
    return render_template('blog.html', posts=BLOG_POSTS)

@app.route('/blog/<int:post_id>')
def blog_post(post_id):
    post = next((p for p in BLOG_POSTS if p['id'] == post_id), None)
    if post:
        return render_template('post.html', post=post)
    return "Post not found", 404

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # In a real app, you'd send an email or save to DB
        flash("Message sent successfully! I'll get back to you soon.")
        return redirect(url_for('contact'))
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)
