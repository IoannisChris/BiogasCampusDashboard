class CalculationStrategy:
    def calculate(self, data):
        raise NotImplementedError

class SumStrategy(CalculationStrategy):
    def calculate(self, data):
        return sum(data)

class AverageStrategy(CalculationStrategy):
    def calculate(self, data):
        return sum(data) / len(data)
