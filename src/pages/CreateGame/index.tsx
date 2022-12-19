import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { GameContext } from "../../contexts/game";

interface GameInterface {
  titulo: string;
  resumo: string;
  genero: string;
  desenvolvedor: string;
  console: string;
  imagem: string;
  avaliacao: number;
}

function CreateGame() {
  const [game, setGame] = useState<GameInterface>({
    titulo: "",
    resumo: "",
    genero: "",
    desenvolvedor: "",
    console: "",
    imagem: "",
    avaliacao: 0,
  });
  const [isWaiting, setIsWaiting] = useState(false);
  const { refresh, setRefresh } = useContext(GameContext);

  const toast = useToast();

  const handleSubmit = (event: FormEvent) => {
    console.log(game);
    setIsWaiting(true);
    event.preventDefault();
    axios
      .post("http://localhost:3000/game", {
        titulo: game.titulo,
        resumo: game.resumo,
        genero: game.genero,
        desenvolvedor: game.desenvolvedor,
        console: game.console,
        imagem: game.imagem,
        avaliacao: game.avaliacao,
      })
      .then(() => {
        setRefresh(!refresh);
        toast({
          title: "Criação de jogo feito com sucesso.",
          description: "Criação de jogo feita com sucesso.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Erro desconhecido",
          description: "Verifique as informações e tente novamente",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsWaiting(false);
      });
  };

  function getBase64(file: any, cb: (result: any) => void) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
  }
  const saveInputFile = (value: any) => {
    getBase64(value[0], (result) => {
      setGame({ ...game, imagem: result });
    });
  };

  const saveInputTitle = (value: any) => {
    setGame({ ...game, titulo: value });
  };

  const saveInputSumary = (value: any) => {
    setGame({ ...game, resumo: value });
  };

  const saveInputGenre = (value: any) => {
    setGame({ ...game, genero: value });
  };

  const saveInputDevolopment = (value: any) => {
    setGame({ ...game, desenvolvedor: value });
  };

  const saveInputConsole = (value: any) => {
    setGame({ ...game, console: value });
  };

  const saveInputEvaluation = (value: any) => {
    setGame({ ...game, avaliacao: value });
  };
  return (
    <>
      <Text fontSize="3xl" fontWeight={"bold"} w="100%" ml={8} mt={5}>
        Criar Jogo
      </Text>
      <form onSubmit={handleSubmit} autoComplete="nope">
        <Box mx={"200px"}>
          <Flex flexDirection="column" w="100%" marginTop={5}>
            <Box flex="1">
              <FormControl isRequired>
                <FormLabel htmlFor="name">titulo</FormLabel>
                <Input
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="text"
                  value={game.titulo}
                  onChange={(event) => {
                    saveInputTitle(event?.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="name">resumo</FormLabel>
                <Input
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="text"
                  value={game.resumo}
                  onChange={(event) => {
                    saveInputSumary(event?.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="name">genero</FormLabel>
                <Select
                  placeholder="Select option"
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  value={game.genero}
                  onChange={(event) => {
                    saveInputGenre(event?.target.value);
                  }}
                >
                  <option value="acao">ação</option>
                  <option value="aventura">aventura</option>
                  <option value="estrategia">estratégia</option>
                  <option value="RPG">RPG</option>
                  <option value="esporte">esporte</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="name">desenvolvedor</FormLabel>
                <Input
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="text"
                  value={game.desenvolvedor}
                  onChange={(event) => {
                    saveInputDevolopment(event?.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="name">console</FormLabel>
                <Input
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="text"
                  value={game.console}
                  onChange={(event) => {
                    saveInputConsole(event?.target.value);
                  }}
                />
              </FormControl>
            </Box>
            <HStack>
              <FormControl isRequired width={"30%"}>
                <FormLabel htmlFor="name">Avaliação</FormLabel>
                <NumberInput defaultValue={0} min={0} max={10}>
                  <NumberInputField
                    max-length="300"
                    borderColor="darkgrey"
                    border="2px"
                    type="number"
                    value={game.avaliacao}
                    onChange={(event) => {
                      saveInputEvaluation(event?.target.value);
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl as="fieldset" isRequired>
                <FormLabel as="legend">Foto</FormLabel>
                <Input
                  multiple
                  type="file"
                  id="fileGame"
                  max-length="300"
                  border="none"
                  onChange={(event) => {
                    saveInputFile(event?.target.files);
                  }}
                  accept="image/*"
                />
              </FormControl>
            </HStack>
          </Flex>
          <Flex justifyContent={"center"} mt={"40px"}>
            <Button
              width={"200px"}
              color="#fff"
              backgroundColor="#16687f"
              mr={3}
              type="submit"
              value="submit"
              id="saveGame"
            >
              {isWaiting ? <Spinner color="white.500" /> : <div> Salvar</div>}
            </Button>
            <Button
              width={"200px"}
              colorScheme="red"
              id="cancelGame"
              onClick={() => {
                setGame({
                  titulo: "",
                  resumo: "",
                  genero: "",
                  desenvolvedor: "",
                  console: "",
                  imagem: "",
                  avaliacao: 0,
                });
              }}
            >
              Cancelar
            </Button>
          </Flex>
        </Box>
      </form>
    </>
  );
}
export default CreateGame;