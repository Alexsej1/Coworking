import numpy as np
import matplotlib.pyplot as plt
from scipy import stats


def read_data(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()
    path_a_str = lines[0].split(': ')[1].strip().split(', ')
    path_b_str = lines[1].split(': ')[1].strip().split(', ')
    path_A = np.array([int(x) for x in path_a_str])
    path_B = np.array([int(x) for x in path_b_str])
    return path_A, path_B

path_A, path_B = read_data('C:/Users/Alex/Desktop/data.txt')


def describe(arr, label):
    n = arr.size
    mean = arr.mean()
    var = arr.var(ddof=1)
    std = arr.std(ddof=1)
    print(f"\nГруппа {label}:")
    print(f" n = {n}")
    print(f" Среднее (x̄)          = {mean:.2f}")
    print(f" Дисперсия (D)         = {var:.2f}")
    print(f" Стандартное отклонение = {std:.2f}")
    return n, mean, var, std

nA, meanA, varA, stdA = describe(path_A, "A")
nB, meanB, varB, stdB = describe(path_B, "B")


plt.figure(figsize=(10, 5))
plt.hist(path_A, bins=10, alpha=0.6, density=True, label="A", edgecolor='black')
plt.hist(path_B, bins=10, alpha=0.6, density=True, label="B", edgecolor='black')
xs = np.linspace(min(path_A.min(), path_B.min()), max(path_A.max(), path_B.max()), 200)
plt.plot(xs, stats.gaussian_kde(path_A)(xs), label="KDE A")
plt.plot(xs, stats.gaussian_kde(path_B)(xs), label="KDE B")
plt.title("Распределения времени")
plt.xlabel("Время (сек)")
plt.ylabel("Плотность")
plt.legend()
plt.grid(True)
plt.show()


fig, axes = plt.subplots(1, 2, figsize=(10, 4))
stats.probplot(path_A, dist="norm", plot=axes[0])
axes[0].set_title("Q–Q график A")
stats.probplot(path_B, dist="norm", plot=axes[1])
axes[1].set_title("Q–Q график B")
plt.tight_layout()
plt.show()


def plot_ecdf(arr, label, color):
    sorted_data = np.sort(arr)
    y = np.arange(1, len(sorted_data) + 1) / len(sorted_data)
    plt.step(sorted_data, y, where='post', label=f"ЭФР {label}", color=color)
    return sorted_data, y

plt.figure(figsize=(8, 5))
plot_ecdf(path_A, "A", "blue")
plot_ecdf(path_B, "B", "green")
plt.title("Эмпирические функции распределения (ЭФР)")
plt.xlabel("Значения")
plt.ylabel("F(x)")
plt.legend()
plt.grid(True)
plt.show()


def plot_ecdf_vs_normal(arr, label):
    mu, sigma = arr.mean(), arr.std(ddof=1)
    z = (arr - mu) / sigma
    z_sorted = np.sort(z)
    ecdf_y = np.arange(1, len(z_sorted) + 1) / len(z_sorted)
    norm_cdf_y = stats.norm.cdf(z_sorted)

    plt.figure(figsize=(8, 5))
    plt.step(z_sorted, ecdf_y, where='post', label="Эмпирическая CDF", color="blue")
    plt.plot(z_sorted, norm_cdf_y, label="Теоретическая CDF (N(0,1))", color="red", linestyle='--')
    D = np.max(np.abs(ecdf_y - norm_cdf_y))
    plt.title(f"K–S сравнение: {label} (D={D:.3f})")
    plt.xlabel("Z-преобразованные значения")
    plt.ylabel("F(x)")
    plt.legend()
    plt.grid(True)
    plt.show()

plot_ecdf_vs_normal(path_A, "Группа A")
plot_ecdf_vs_normal(path_B, "Группа B")

def ks_test(arr, label):
    mu, sigma = arr.mean(), arr.std(ddof=1)
    z = (arr - mu) / sigma
    ks_stat, p_value = stats.kstest(z, 'norm')
    print(f"K–S тест ({label}): D={ks_stat:.4f}, p={p_value:.4f}",
          "→ нормальность не отвергается" if p_value > 0.05 else "→ нормальность отвергается")
    return ks_stat, p_value

D_A, p_A = ks_test(path_A, "A")
D_B, p_B = ks_test(path_B, "B")

def shapiro_explained(arr, label):
    w, p = stats.shapiro(arr)
    print(f"Shapiro–Wilk тест ({label}): W={w:.4f}, p={p:.4f}",
          "→ нормальность не отвергается" if p > 0.05 else "→ нормальность отвергается")

shapiro_explained(path_A, "A")
shapiro_explained(path_B, "B")

numerator = abs(meanA - meanB)
pooled_var = np.sqrt((nA * varA + nB * varB))
t_ex = (numerator / pooled_var) * np.sqrt(nA * nB * (nA + nB - 2) / (nA + nB))
df = 52
t_crit = stats.t.ppf(1 - 0.025, df)

print(f" t_эксп = {t_ex:.3f}")
print(f" df     = {df}")
print(f" t_крит  ≈ {t_crit:.3f} (α=0.05)")

if abs(t_ex) >= t_crit:
    print("→ |t_эксп| ≥ t_крит ⇒ отвергаем H₀: средние различны")
else:
    print("→ |t_эксп| < t_крит ⇒ не отвергаем H₀: средние равны")
