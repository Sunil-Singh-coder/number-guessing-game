from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Game ka initial state
computer_number = random.randint(1, 100)
count = 0

@app.route('/')
def index():
    print(f"Index loaded. Computer number: {computer_number}, Count: {count}")
    return render_template('index.html')

@app.route('/guess', methods=['POST'])
def guess():
    global computer_number, count
    try:
        user_guess = int(request.form['guess'])
        count += 1
        print(f"Guess: {user_guess}, Computer number: {computer_number}, Count: {count}")
        if user_guess < computer_number:
            message = "Tera number chhota hai!"
        elif user_guess > computer_number:
            message = "Tera number bada hai!"
        else:
            message = f"Badhai ho! Tu {user_guess} guess kiya aur {count} attempts me jeet gaya!"
            computer_number = random.randint(1, 100)  # New number for next game
            count = 0  # Reset count after win
            print(f"Win! New computer number: {computer_number}, Count reset to: {count}")
        return jsonify({'message': message, 'count': count})
    except ValueError:
        print(f"Invalid guess received: {request.form['guess']}")
        return jsonify({'message': "Invalid input! Number daal.", 'count': count})

@app.route('/reset', methods=['POST'])
def reset():
    global computer_number, count
    computer_number = random.randint(1, 100)
    count = 0
    print(f"Game reset. New computer number: {computer_number}, Count: {count}")
    return jsonify({'message': "Game reset ho gaya! Naya number guess karo.", 'count': count})

if __name__ == '__main__':
    app.run(debug=True)