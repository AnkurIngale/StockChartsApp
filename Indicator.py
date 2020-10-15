import numpy as np
import math

class Indicator():

    def average(self, prices):
        total = 0
        for price in prices:
            total += price
        return total / len(prices)

    def simple_moving_average(self, prices, lookback = 12):
        data_length = len(prices)
        volumes = [1] * data_length

        return self.volume_weighted_average(prices, volumes, lookback)

    def exponential_moving_average(self, prices):
        data_len = len(prices)
        alpha = 0.5
        ema = np.zeros(data_len)
    
        ema[0] = prices[0]
        for i in range(1,data_len):
            ema[i] = alpha * prices[i] + ema[i - 1] * (1 - alpha)
        
        return ema

    def volume_weighted_average(self, prices, volumes, lookback = 12):
        
        price_volume = 0
        volume = 0

        price_queue = []
        volume_queue = []

        data_len = len(prices)
        vwap = np.zeros(data_len - lookback + 1)

        for i in range(data_len):
            price_volume += prices[i] * volumes[i]
            volume += volumes[i]

            price_queue.append(prices[i] * volumes[i])
            volume_queue.append(volumes[i])

            if len(price_queue) > lookback:
                price_volume -= price_queue.pop(0)
                volume -= volume_queue.pop(0)
            
            if len(price_queue) == lookback:
                vwap[i - lookback + 1] = price_volume / volume

        return vwap

    def relative_strength_index(self, prices, lookback = 14):
        """
            Not completely done!
        """
        data_len = len(prices)

        percentage_returns = np.zeros(data_len - 1)
        for i in range(1,data_len):
            percentage_returns[i - 1] = ((prices[i] - prices[i - 1]) / prices[i - 1]) * 100
        
        avg_gain = []
        avg_loss = []

        

