import numpy as np
import pandas as pd
import scipy.stats as st
from statsmodels.tsa.ar_model import AutoReg

from Indicator import Indicator

class stock_models():

    def black_scholes(self,data):
        data_len = len(data)
        data = np.log(data)
        data_diff = [data[i + 1] - data[i] for i in range(data_len - 1)]
        data_diff.sort()
        
        sigma = np.std(data_diff[10:-10])
        mu = np.mean(data_diff[10:-10])

        pred_price = data[-1] + (mu + sigma * np.randn())
        pred_price = np.exp(pred_price)

        return pred_price
    
    def auto_reg(self, data, k):
        data = data[::-1]
        res = AutoReg(data,lags = k).fit()
        coeff = res.params.to_numpy()
        return coeff

    def moving_average_model(self,data):

        data_len = len(data)

        indicator = Indicator()
        ema = indicator.exponential_moving_average(data)
        
        data_ema_diff = [data[i] - ema[i - 12] for i in range(12,data_len)]

        data_ema_diff.sort()

        mu = np.mean(data_ema_diff[10:-10])
        sigma = np.std(data_ema_diff[10:-10])

        pred_price = ema[-1] + (mu + sigma * np.randn())

        return pred_price