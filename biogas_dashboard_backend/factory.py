class ProcessorFactory:
    @staticmethod
    def get_processor(type):
        if type == 'waste':
            return WasteProcessor()
        elif type == 'energy':
            return EnergyProcessor()
        elif type == 'health':
            return SystemHealthProcessor()
        else:
            raise ValueError("Unknown processor type")

class WasteProcessor:
    def process(self, data):
        # Process waste data logic
        return f"Processed waste data: {data}"

class EnergyProcessor:
    def process(self, data):
        # Process energy data logic
        return f"Processed energy data: {data}"

class SystemHealthProcessor:
    def process(self, data):
        # Process system health data logic
        return f"Processed system health data: {data}"
