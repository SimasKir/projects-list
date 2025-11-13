"use client";
import Image from "next/image";
import {
  CardButtonProps,
  ProjectCardResponse,
  ProjectStatusEnum,
} from "@/types/types";

export const ProjectCard = ({ project }: { project: ProjectCardResponse }) => {
  const {
    pid,
    project_name,
    image_url,
    initial_rating,
    country,
    loan_ratio_external,
    loan_ratio_max,
    invested_amount,
    required_amount,
    days_to_get_money,
    investors,
    credit_duration,
    basic_interest,
    max_bonus_interest,
    preview_url,
    status,
    security_measures,
  } = project;

  const fundedPercent = required_amount
    ? parseFloat(((invested_amount / required_amount) * 100).toFixed(1))
    : 0;

  const showFlag = (country: string) => {
    return (
      <div className="relative flex justify-center">
        <Image
          src={`/flags/${country.toLowerCase()}.svg`}
          alt={`${country}`}
          width={30}
          height={20}
        />
      </div>
    );
  };

  let ratingStyle = "";

  if (["AA+", "AAA", "AA"].includes(initial_rating)) {
    ratingStyle = " bg-[var(--profitus-color-24)]";
  } else if (["AA-", "A", "A+"].includes(initial_rating)) {
    ratingStyle = " bg-[var(--profitus-color-25)]";
  } else if (["A-", "BBB+", "BBB", "BBB-"].includes(initial_rating)) {
    ratingStyle = " bg-[var(--profitus-color-26)]";
  }

  const CardButton: React.FC<CardButtonProps> = ({ status, preview_url }) => {
    return (
      <div className="col-span-3">
        {preview_url && status === ProjectStatusEnum.OPEN_FOR_INVESTMENTS && (
          <a
            href={preview_url}
            className="text-[var(--profitus-color-1)] bg-[var(--profitus-color-2)] rounded-[60px] block text-center py-2 hover:bg-[var(--profitus-color-3)] cursor-pointer transition-colors duration-200"
          >
            Investuokite
          </a>
        )}
        {preview_url && status === ProjectStatusEnum.COMING_SOON && (
          <a
            href={preview_url}
            className="text-[var(--profitus-color-1)] bg-[var(--profitus-color-7)] rounded-[60px] block text-center py-2 cursor-pointer"
          >
            Jau netrukus!
          </a>
        )}
        {preview_url && status === ProjectStatusEnum.CONFIRMED && (
          <a
            href={preview_url}
            className="text-[var(--profitus-color-1)] bg-[var(--profitus-color-7)] rounded-[60px] block text-center py-2 cursor-pointer"
          >
            Patvirtinta
          </a>
        )}
        {preview_url && status === ProjectStatusEnum.FUNDED && (
          <a
            href={preview_url}
            className="text-[var(--profitus-color-1)] bg-[var(--profitus-color-7)] rounded-[60px] block text-center py-2 cursor-pointer"
          >
            Išmokėta
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#ebe8ff] text-[#736c93] rounded-xl w-full px-3 py-2 grid items-center gap-2 [grid-template-columns:repeat(25,minmax(0,1fr))] text-sm">
      <div className="col-span-3">
        {image_url && (
          <div className="relative">
            {security_measures &&
              security_measures === "first_rank_mortgage" && (
                <div className="absolute top-0 left-0 p-2">
                  <Image
                    src="first-place.svg"
                    alt="first place"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-6 h-6"
                  />
                </div>
              )}
            <Image
              src={image_url}
              alt={`Profitus investment project ${pid}`}
              width={300}
              height={200}
              sizes="100vw"
              className="w-full h-auto rounded-md object-cover"
              placeholder="blur"
              blurDataURL="/blur.png"
            />
          </div>
        )}
      </div>

      <div className="col-span-3 font-bold pl-4">
        {project_name && <p>{project_name}</p>}
      </div>
      <div className="col-span-2 flex justify-center">
        {initial_rating && (
          <p
            className={`p-2 rounded-full font-bold text-[var(--profitus-color-1)]${ratingStyle}`}
          >
            {initial_rating}
          </p>
        )}
      </div>
      <div className="col-span-1">{country && showFlag(country)}</div>

      <div className="col-span-2 flex justify-center text-center">
        {loan_ratio_external && loan_ratio_max ? (
          <p>
            {loan_ratio_external}%<br />
            (maks. {loan_ratio_max}%)
          </p>
        ) : (
          <p>-</p>
        )}
      </div>

      <div className="col-span-2 flex justify-center">
        {invested_amount ? (
          <p>
            {invested_amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €
          </p>
        ) : (
          <p>-</p>
        )}
      </div>
      <div className="col-span-2 flex justify-center">
        {required_amount ? (
          <p>
            {required_amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €
          </p>
        ) : (
          <p>-</p>
        )}
      </div>
      <div className="col-span-1 flex justify-center">
        {days_to_get_money ? <p>{days_to_get_money} d.</p> : <p>-</p>}
      </div>
      <div className="col-span-1 flex justify-center">
        {investors ? <p>{investors}</p> : <p>-</p>}
      </div>
      <div className="col-span-1 flex justify-center text-center">
        {credit_duration ? <p>{credit_duration} mėn.</p> : <p>-</p>}
      </div>

      <div className="col-span-2 flex justify-center">
        <p>{fundedPercent}%</p>
      </div>

      <div className="col-span-2 text-[#3c46d2] font-bold flex justify-center">
        {basic_interest && max_bonus_interest ? (
          <p>
            {Math.round(basic_interest)}–{Math.round(max_bonus_interest)}%
          </p>
        ) : (
          <p>~{Math.round(basic_interest)}%</p>
        )}
      </div>

      <CardButton status={status} preview_url={preview_url} />
    </div>
  );
};
