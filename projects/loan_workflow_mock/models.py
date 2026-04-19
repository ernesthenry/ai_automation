"""Loan states and allowed transitions (see ``ALLOWED``)."""

from __future__ import annotations

from enum import StrEnum


class LoanState(StrEnum):
    DRAFT = "DRAFT"
    SUBMITTED = "SUBMITTED"
    UNDER_REVIEW = "UNDER_REVIEW"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    DISBURSED = "DISBURSED"
    ACTIVE = "ACTIVE"
    REPAID = "REPAID"


ALLOWED: dict[LoanState, tuple[LoanState, ...]] = {
    LoanState.DRAFT: (LoanState.SUBMITTED,),
    LoanState.SUBMITTED: (LoanState.UNDER_REVIEW, LoanState.REJECTED),
    LoanState.UNDER_REVIEW: (LoanState.APPROVED, LoanState.REJECTED),
    LoanState.APPROVED: (LoanState.DISBURSED, LoanState.REJECTED),
    LoanState.DISBURSED: (LoanState.ACTIVE,),
    LoanState.ACTIVE: (LoanState.REPAID, LoanState.REJECTED),
    LoanState.REJECTED: (),
    LoanState.REPAID: (),
}
