import { Button } from "@/components/Button";
import { Prisma, TripReservation } from "@prisma/client";
import { format } from "date-fns";

import ptBr from "date-fns/locale/pt-BR";

import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

interface Props {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
}

export function UserReserventionItem({ reservation }: Props) {
  const { trip } = reservation;

  if (!trip) return null;

  return (
    <div>
      <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip.coverImage}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
              alt={trip.name}
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary underline">
                {trip.location}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-5 text-primaryDarker">
          <h3 className="text-sm">Data</h3>

          <div className="flex items-center gap-1">
            <p className="text-sm">
              {format(new Date(reservation.startDate), "dd 'de' MMMM", {
                locale: ptBr,
              })}
            </p>
            {" - "}
            <p className="text-sm">
              {format(new Date(reservation.endDate), "dd 'de' MMMM", {
                locale: ptBr,
              })}
            </p>
          </div>

          <h3 className="mt-5 text-sm">Hóspedes</h3>
          <p className="text-sm pb-5">{reservation.guests} hóspedes</p>

          <h3 className="font-semibold text-primaryDarker mt-3 pt-5 border-t border-solid border-grayLighter">
            Informações sobre o preço
          </h3>

          <div className="flex justify-between mt-1">
            <p className="text-primaryDarker text-sm">Total:</p>
            <p className="font-medium text-sm">
              R$ {Number(reservation.totalPaid)}
            </p>
          </div>

          <Button variant="danger" className="mt-3 w-full">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
