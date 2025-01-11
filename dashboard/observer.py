class Observable:
    def __init__(self):
        self._observers = []

    def register_observer(self, observer):
        self._observers.append(observer)

    def notify_observers(self, data):
        for observer in self._observers:
            observer.update(data)

class Logger:
    def update(self, data):
        print(f"Logging data: {data}")

class Notifier:
    def update(self, data):
        print(f"Sending notification: {data}")
