from flowit_crm.salon.api import SalonAPI


class SalonInterface:
    @staticmethod
    def get_worker_by_id(pk):
        return SalonAPI.get_worker_by_id(pk)
