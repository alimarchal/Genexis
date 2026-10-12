/**
 * Equal monthly instalment of an amortising loan.
 *
 * With a 0% rate the usual annuity formula divides 0 by 0 (NaN), so the
 * principal is simply spread evenly over the tenure.
 */
export function monthlyInstalment(principal: number, annualRatePercent: number, months: number): number {
    if (!Number.isFinite(principal) || !Number.isFinite(annualRatePercent) || principal <= 0 || months <= 0) {
        return 0;
    }

    const monthlyRate = annualRatePercent / 100 / 12;

    if (monthlyRate === 0) {
        return principal / months;
    }

    const growth = Math.pow(1 + monthlyRate, months);

    return (principal * monthlyRate * growth) / (growth - 1);
}
