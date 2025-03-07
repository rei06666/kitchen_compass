from flask import Flask, request, jsonify
from query import search_similar_recipes

app = Flask(__name__)

@app.route('/search', methods=['POST'])
def search():
    try:
        data = request.get_json()
        query = data.get('query')
        menucount = data.get('menucount')
        if not query:
            return jsonify({'error': 'Query is required'}), 400
        similar_recipes = search_similar_recipes(query, menucount)
        return jsonify({'data': similar_recipes})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)